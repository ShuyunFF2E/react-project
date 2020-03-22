import React from 'react';
import ViewModel from './view-model';

export default class Home extends React.Component {

	vm = new ViewModel()

	componentDidMount() {
		this.vm.fetchContent()
	}

	render() {
		const { content } = this.vm;

		return (
			<>
				<h2>React-project</h2>
				<p>{content}</p>
			</>
		)
	}
}
