import {useCallback, useState, useEffect} from 'react';
import axios from 'axios';
import {storage, useMmkvStorage} from '../storage/useStorage/useStorage';
import {pinnedNewsAtom} from '../actions/atoms';
import {useRecoilState} from 'recoil';

const RETRY_LIMIT = 3;
const RETRY_DELAY = 1000;

export function useNewsCalls() {
  const {getItem, setItem, removeItem} = useMmkvStorage();
  const [headlines, setHeadlines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  const fetchData = useCallback(
    async (clear = false, retries = RETRY_LIMIT) => {
      try {
        const storedHeadlines = getItem('headlines');

        if (storedHeadlines && storedHeadlines.length > 0) {
          console.error('store-datta', storedHeadlines);
          console.error('dsakl', storedHeadlines?.length);

          setHeadlines(storedHeadlines.slice(0, 10));

          setItem('headlines', storedHeadlines.slice(10));

          setLoading(false);
          return;
        }

        const response = await axios.get(
          'https://newsapi.org/v2/everything?q=apple&from=2024-08-05&to=2024-08-05&sortBy=popularity&apiKey=5f291ce615174302bec81674f965b087',
          {
            params: {
              pageSize: 100,
              offset: 0,
            },
          },
        );

        const articles = response.data.articles;
        console.error('online-datta', articles?.length);

        setItem('headlines', articles);

        setHeadlines(articles.slice(0, 10));

        // Update the offset to manage the next fetch if needed
        setOffset(10);
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response?.status === 429 &&
          retries > 0
        ) {
          console.error('Rate limit exceeded. Retrying in a few seconds...');
          setTimeout(() => fetchData(clear, retries - 1), RETRY_DELAY);
        } else {
          console.error('Error fetching data:', error);
          const storedHeadlines = getItem('headlines');
          if (storedHeadlines) {
            setHeadlines(storedHeadlines.slice(0, 10));
          }
        }
      } finally {
        setLoading(false);
      }
    },
    [getItem, setItem, offset],
  );

  useEffect(() => {
    fetchData(true);
  }, []);

  return {headlines, loading, fetchData};
}

export function useTopHeadlines() {
  const {getItem, setItem, removeItem} = useMmkvStorage();
  const [headlines, setHeadlines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTopHeadlines = useCallback(() => {
    const storedHeadlines = getItem('headlines') || [];
    if (storedHeadlines.length > 0) {
      const newHeadlines: any = [];

      for (let i = 0; i < 5 && storedHeadlines.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * storedHeadlines.length);
        newHeadlines.push(storedHeadlines.splice(randomIndex, 1)[0]);
      }

      setHeadlines(prev => [...newHeadlines, ...prev]);
      if (storedHeadlines.length > 0) {
        setItem('headlines', storedHeadlines);
      } else {
        removeItem('headlines');
      }

      setLoading(false);
    }
  }, [getItem, setItem, removeItem]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTopHeadlines();
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchTopHeadlines]);

  useEffect(() => {
    fetchTopHeadlines();
  }, [fetchTopHeadlines]);

  return {headlines, loading};
}
export const usePinnedNews = () => {
  const [pinnedNews, setPinnedNews] = useRecoilState(pinnedNewsAtom);
  const [loading, setLoading] = useState(true);

  const loadPinnedNews = useCallback(() => {
    setLoading(true);
    try {
      const pinnedItems = storage.getString('pinnedHeadlines');
      if (pinnedItems) {
        setPinnedNews(JSON.parse(pinnedItems));
      }
    } catch (error) {
      console.error('Error loading pinned news:', error);
    } finally {
      setLoading(false);
    }
  }, [setPinnedNews]);

  useEffect(() => {
    loadPinnedNews();
  }, [loadPinnedNews]);

  const savePinnedHeadlines = newPinnedHeadlines => {
    setPinnedNews(newPinnedHeadlines);
    storage.set('pinnedHeadlines', JSON.stringify(newPinnedHeadlines));
  };

  return {pinnedNews, loading, savePinnedHeadlines};
};
