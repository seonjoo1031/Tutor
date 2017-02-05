export const get_courses_wo_summary = (email) => {
  query =  `https://www.ringleplus.com/api/v1/course/courses_wo_summary?email=${email}`;
  return fetch(query);
};

export const urlForPreStudy = (token) => {
  query = `http://schedule.ringleplus.com/api/v1/lesson/soon_lessons_v2?token=${token}`;
  return fetch(query);
};

export const urlForApply = (email) => {
  query = `https://www.ringleplus.com/api/v1/calendar/get_calendar?email=${email}&year=2017&month=1&week_num=1&auto=1`;
  return fetch(query);
};

export const urlForUnassignedLessons = (token) => {
  query = `http://schedule.ringleplus.com/api/v1/lesson/get_unassigned_lessons?token=${token}`;
  return fetch(query);
};

export const urlForUpdateConfirm = () => {
  query = `http://schedule.ringleplus.com/api/v1/apply/update_tutor_confirm_state`
  return query;
};

export const urlForUpdateApply = () => {
  query = `http://schedule.ringleplus.com/api/v1/apply/submit`
  return query;
};

export const urlForCompensation = (token, year, week) => {
  query = `http://schedule.ringleplus.com/api/v1/payments/compensation?token=${token}&year=${year}&week=${week}`
  console.log(query);
  return fetch(query);
};

export const urlForPostStudy = (token, page) => {
  query = `http://schedule.ringleplus.com/api/v1/courseinfo/poststudy?token=${token}&page=${page}`
  return fetch(query);
};

export const urlForCourseDetail = (course_id) => {
  query = `https://www.ringleplus.com/api/v1/courseinfo/course_detail?course_id=${course_id}`;
  return fetch(query);
};

export const urlForFBAndGGLogin = (email) => {
  query = `https://www.ringleplus.com/api/v1/userinfo/facebook?email=${email}`;
  return fetch(query);
};

export const urlForSignup = () => {
  query = `http://schedule.ringleplus.com/api/v1/userinfo/signup`;
  return query;
};

export const ringle_auth_signInWithEmailAndPassword = (email, password, registrationToken) => {
  //post method!
  query = `https://www.ringleplus.com/api/v1/userinfo/email?email=${email}&password=${password}&registration_token=${registrationToken}`;
  console.log(query);
  return fetch(query);
};

export const urlForRegisterToken = () => {
  query =  'https://www.ringleplus.com/api/v1/userinfo/registertoken';
  return query;
}

export const urlForChatWithAdmin = () => {
  query = "https://www.ringleplus.com/api/v1/chat/insert_chat";
  return query;
};

export const push_toggle = () => {
  query = `http://schedule.ringleplus.com/api/v1/user/update_push_notification_setting`;
  return query;
};

export const email_toggle = () => {
  query = `http://schedule.ringleplus.com/api/v1/user/update_email_notification_setting`;
  return query;
};

export const urlForReferralEmailCheck = (referral) => {
  query = `https://www.ringleplus.com/api/v1/signup/insert_referral_code?referral_code=${referral}`
  return fetch(query);
}
