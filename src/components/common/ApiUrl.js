export const get_courses_wo_summary = (email) => {
  query =  `https://www.ringleplus.com/api/v1/course/courses_wo_summary?email=${email}`;
  return fetch(query);
};

export const urlForPreStudy = (email) => {
  query = `http://schedule.ringleplus.com/api/v1/lesson/soon_lessons?email=${email}`;
  return fetch(query);
};

export const urlForUnassignedLessons = (email) => {
  query = `https://www.ringleplus.com/api/v1/lesson/get_unassigned_lessons?email=${email}`;
  return fetch(query);
};

export const urlForUpdateConfirm = () => {
  query = `https://www.ringleplus.com/api/v1/apply/update_tutor_confirm_state`
  return query;
};

export const urlForPostStudy = (email, page) => {
  query = `http://schedule.ringleplus.com/api/v1/courseinfo/poststudy?email=${email}&page=${page}`
  return fetch(query);
};

export const urlForCourseDetail = (course_id) => {
  query = `https://www.ringleplus.com/api/v1/courseinfo/course_detail?course_id=${course_id}`;
  return fetch(query);
};
