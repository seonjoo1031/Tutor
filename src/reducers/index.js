import { combineReducers } from 'redux';
import CourseReducer from './CourseReducer';
import UpcomingReducer from './UpcomingReducer';
import PastLessonsReducer from './PastLessonsReducer';
import DetailCourseReducer from './DetailCourseReducer';
import AuthReducer from './AuthReducer';


export default combineReducers({
  courses: CourseReducer,
  upcomingLessons: UpcomingReducer,
  pastLessons: PastLessonsReducer,
  detailCourse: DetailCourseReducer,
  auth: AuthReducer
});
