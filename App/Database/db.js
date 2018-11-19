import Vasern from 'vasern';

// Import schemas
import { HistoryKeywordModel } from './HistoryKeyword';

export default new Vasern({
  schemas: [HistoryKeywordModel],
  version: 1
});
