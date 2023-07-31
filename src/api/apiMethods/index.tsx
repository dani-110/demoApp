import {Info} from '../../@types';
import axios from '../';

const getData = async (url: string) => {
  return await axios.get(url);
};

const postData = async (url: string, info: Info) => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + info.token;
  return await axios
    .post(url, info.data)
    .then((response: any) => {
      console.log(response, 'in success');
      return response;
    })
    .catch((e: any) => {
      return e.response;
    });
};

const putData = async (url: string, info: Info) => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + info.token;
  await axios.put(url, info.data).then(
    (response: any) => {
      return response;
    },
    (error: any) => {
      return error;
    },
  );
};

export default {
  _getApi: getData,
  _postApi: postData,
  _putApi: putData,
};
