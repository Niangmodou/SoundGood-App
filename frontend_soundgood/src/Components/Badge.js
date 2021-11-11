import React from 'react';
import { FaTrophy } from 'react-icons/fa';
import '../Css/BadgeComponent.css';

export default function Badge() {
  return (
    <div className='badge'>
      <FaTrophy />
      <div className='badgeDescription'>
        <h2>First Badge</h2>
        <p>Know-It-All</p>
      </div>
      <div className='badgeDescription'>
        <p>Earned On</p>
        <p>12/16/2000</p>
      </div>
    </div>
  );
}
