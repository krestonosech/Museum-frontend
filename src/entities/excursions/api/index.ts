import { axios } from '@/plugins/axios';
import { showNotification } from '@/plugins/notifications';

export async function fetchExcursions(item?: string, search?: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const response = await axios.post('/excursions', { type: item, search }, config);
    return response.data.data;
  } catch {
    showNotification({
      type: 'error',
      text: 'Не удалось запросить экскурсии!',
    });
  }
}

export async function fetchExcursionsRequests(username?: string) {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };
    const response = await axios.post('/excursion-requests', { username }, config);
    return response.data;
  } catch {
    showNotification({
      type: 'error',
      text: 'Не удалось запросить записи на экскурсии!',
    });
  }
}
