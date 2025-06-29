import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 50,
  duration: '10s',
};

export default function () {
  http.post('http://localhost:3000/benchmark/postgres/write');
  sleep(1);
}
