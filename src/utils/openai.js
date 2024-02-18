import OpenAI from 'openai';
import { OPENAI_KEY } from './constants';

const openai = new OpenAI({
  apiKey: OPENAI_KEY, 
  dangerouslyAllowBrowser: true, //By default open ai does not allow you to make call from the browser
});

export default openai;