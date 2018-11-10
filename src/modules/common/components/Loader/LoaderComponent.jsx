import React, { Component } from 'react'
import Loader from 'react-loader-spinner'
import './Loader.scss'

const LoaderComponent = ({}) => (
		<Loader type="ThreeDots"
				color="#984B43"
				height="100"
				width="100"
				style='loader'
				loading={false}/>
)

export default LoaderComponent
