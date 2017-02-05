import { combineReducers } from 'redux';
import CourseReducer from './CourseReducer';
import UpcomingReducer from './UpcomingReducer';
import PastLessonsReducer from './PastLessonsReducer';
import DetailCourseReducer from './DetailCourseReducer';
import AuthReducer from './AuthReducer';
import ChatReducer from './ChatReducer';
import ApplyReducer from './ApplyReducer';
import CompensationReducer from './CompensationReducer';


export default combineReducers({
  courses: CourseReducer,
  upcomingLessons: UpcomingReducer,
  pastLessons: PastLessonsReducer,
  detailCourse: DetailCourseReducer,
  auth: AuthReducer,
  chat: ChatReducer,
  apply: ApplyReducer,
  compensation: CompensationReducer
});
