import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: parseInt(__ENV.VUS || '10'),
  duration: __ENV.DURATION || '30s',
};

const method = __ENV.METHOD || 'GET';
const url = `http://localhost:3000${__ENV.ENDPOINT || '/benchmark/postgres/read'}`;
const headers = { 'Content-Type': 'application/json' };

export default function () {
  if (method === 'GET') {
    http.get(url, { headers });
  } else {
    http.post(url, '{}', { headers });
  }
  sleep(1);
}
