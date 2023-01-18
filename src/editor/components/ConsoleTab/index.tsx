import React, { useState } from 'react';
import './index.css';

interface propsTypes {
  setlogVisible: (logVisible: boolean) => void;
  logVisible: boolean;
}
type activeType = 0 | 1;

export const ConsoleTab = (props: propsTypes) => {
  const { setlogVisible, logVisible } = props;
  const [activeValue, setActiveValue] = useState<activeType>(1);
  return (
    <div className="console-box-tab">
      <div className="test">
        <div
          className={`console-box-tab-test ${activeValue === 0 && 'active'}`}
          onClick={() => {
            setActiveValue(0);
          }}
        >
          <div className="css-l4jzv2-TabHeaderRow">
            <span>测试用例</span>
          </div>
        </div>
        <div
          className={`console-box-tab-test ${activeValue === 1 && 'active'}`}
          onClick={() => {
            setActiveValue(1);
          }}
        >
          <div className="css-l4jzv2-TabHeaderRow">
            <span>代码执行结果</span>
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          setlogVisible(!logVisible);
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width="1em"
          height="1em"
          className="css-1lc17o4-icon"
        >
          <path
            fill-rule="evenodd"
            d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"
          ></path>
        </svg>
      </div>
    </div>
  );
};
