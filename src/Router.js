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

const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{ color: selected ? '#7a5de8' : '#2e2b4f' }}>{title}</Text>
  );
};

const RouterComponent = () => {
  return (
    <Router>
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

    </Router>
  );
};

export default RouterComponent;
