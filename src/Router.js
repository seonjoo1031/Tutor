import React from 'react';
import { Text } from 'react-native';
import { Scene, Router, ActionConst } from 'react-native-router-flux';
import Main from './components/Main';
import Apply from './components/Apply';
import PastLessons from './components/PastLessons';
import UpcomingLessons from './components/UpcomingLessons';
import MySetting from './components/MySetting';
import CourseView from './components/CourseView';
import DetailCourseView from './components/DetailCourseView';
import ExtraContents from './components/ExtraContents';
import KeyQuestions from './components/KeyQuestions';
import RenderWebView from './components/RenderWebView';
import PrivacyPolicy from './components/PrivacyPolicy';
import Login from './components/Login'; // 자동 로그인 처리 및 일정 시간 뒤 로그인으로
import LoginForm from './components/LoginForm';
import Signup from './components/Signup';
import Splash from './components/Splash';
import LiveLesson from './components/LiveLesson';


const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{ color: selected ? '#7a5de8' : '#2e2b4f' }}>{title}</Text>
  );
};

const RouterComponent = () => {
  return (
    <Router>

      <Scene key="splash" component={Splash} hideNavBar={true} type={ActionConst.RESET} />
      <Scene key="auth" type={ActionConst.RESET}>
        <Scene key="login" component={Login} hideNavBar={true} />
        <Scene key="loginForm" component={LoginForm} title='LOGIN' hideNavBar={true}/>
        <Scene key="privacyPolicy" component={PrivacyPolicy} title='개인정보 보호정책' hideNavBar={true}/>
      </Scene>

      <Scene key="signup" component={Signup} title='Sign Up' hideNavBar={true} />

      <Scene key="main" tabs={true} title='Ringle' hideNavBar={true} type={ActionConst.RESET} >
        <Scene key="firstPage" component={Main} icon={TabIcon} hideNavBar={true} />
        <Scene key="apply" component={Apply} icon={TabIcon} title='Apply' hideNavBar={true} />
        <Scene key="upcomingLessons" component={UpcomingLessons} icon={TabIcon} title='Upcoming lessons' hideNavBar={true} />
        <Scene key="pastLessons" component={PastLessons} icon={TabIcon} title='Past lessons' hideNavBar={true} />
        <Scene key="mySetting" component={MySetting} icon={TabIcon} title='My setting' hideNavBar={true} />
      </Scene>

      <Scene key="courseView" component={CourseView} hideNavBar={true} />
      <Scene key="detailCourseView" component={DetailCourseView} hideNavBar={true} />
      <Scene key="keyQuestions" component={KeyQuestions} title='KeyQuestions' />
      <Scene key="extraContents" component={ExtraContents} title='ExtraContents' />
      <Scene key="renderWebView" component={RenderWebView} title='Web' />
      <Scene key="liveLesson" component={LiveLesson} hideNavBar={true} />

    </Router>
  );
};

export default RouterComponent;
