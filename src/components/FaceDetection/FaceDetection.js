import React from 'react';
import './FaceDetection.css'

const FaceDetection = ({ imageUrl, boxes }) => {
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img 
				id='inputImage'
				src={imageUrl} 
				width='500px'
				height='auto'
				alt=''
				/>
				{ 	boxes.map((user, index) => {
						return (
							<div 
								key={index}
								className='bounding-box'
								style={{
									top: boxes[index].topRow,
									right: boxes[index].rightCol,
									bottom: boxes[index].bottomRow,
									left: boxes[index].leftCol
								}}
							></div>
						)
					})	
				}			
			</div>
		</div>
	)
}

export default FaceDetection;