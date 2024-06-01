import React from 'react';
import BudgetPlanner from './BudgetPlanner';
import Poll from './Poll';
import './ExplorePage.css';
import Quiz from "./Quiz";

const ExplorePage = () => {
  return (
    <div className="explore-page container">
      <h1>Explore</h1>
      <div className='section'>
        <Quiz />
      </div>
      <div className="section">
        <BudgetPlanner />
      </div>
      <div className="section">
        <Poll />
      </div>
    </div>
  );
};

export default ExplorePage;
