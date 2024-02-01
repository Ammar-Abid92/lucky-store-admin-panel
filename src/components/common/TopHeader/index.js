import React from 'react';

const TopHeader = ({ onAction, title }) => {

    return (
        
        <div className='sidebarHeaderInner'>
            <span className='innerHeaderAction'>
                <svg onClick={onAction}  fill='var(--mediumGray)' xmlns='http://www.w3.org/2000/svg' width='24' height='24'>
                    <path fill="" d="M8.593,12.534l9.215-9.197c0.188-0.185,0.372-0.366,0.543-0.557c0.205-0.226,0.281-0.507,0.209-0.756
c-0.079-0.278-0.305-0.489-0.608-0.577c-0.088-0.025-0.166-0.038-0.234-0.038c-0.077,0-0.281,0-0.614,0.334l-10.8,10.788
c1.255,1.251,3.804,3.803,6.127,6.128c2.305,2.308,4.387,4.39,4.754,4.753c0.267,0.265,0.5,0.333,0.931,0.205
c0.331-0.108,0.498-0.316,0.538-0.69c0.024-0.296-0.163-0.532-0.371-0.74L8.593,12.534z"/>
                </svg>
            </span>
            <span className='textStyling18 darkGrayColor innerHeaderTitle'>
                {title}
            </span>
        </div>
    )
}

export default TopHeader