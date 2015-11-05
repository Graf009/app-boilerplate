/*
* @Author: Oleg Orlov
* @Date:   2015-10-23 17:25:19
*/

import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

export default createDevTools(
  <DockMonitor toggleVisibilityKey="H"
               changePositionKey="Q"
               defaultIsVisible={false}>
    <LogMonitor />
  </DockMonitor>
);
