import React from 'react';
import Modal from 'react-modal';
import {customStyles} from '../../constants';
import Loader from './../Loader';
import Fluxxor, {StoreWatchMixin} from 'fluxxor';
var FluxMixin = Fluxxor.FluxMixin(React)

var BudgetActivity = React.createClass({
	mixins: [FluxMixin, StoreWatchMixin('BudgetStore')],
	getStateFromFlux: function(){

		return {
			BudgetStore: this.getFlux().store('BudgetStore').getState()
		}
	},
	componentDidMount: function(){
		
		this.getFlux().actions.BudgetActions.getBudgetActivity(this.props.id)		
	},
	render: function(){

		var {activity, isFetchingBudgetActivity} = this.state.BudgetStore;
		
		if(isFetchingBudgetActivity) return <Loader />;

		if(!activity.length) return null;

		return (
			<div className="sp-module">
				<h2 className="sp-module-title">Activity</h2>
				<div className="sp-module-content">
					<ul className="list-items list-user">
						{activity.map((activity, idx) => {


							return (
								<BudgetActivityItem key = {idx} activity = {activity} />
							)
						})}
						
					</ul>
				</div>
			</div>
		)
	}
});


var BudgetActivityItem = React.createClass({
	getInitialState: function(){

		return {
			isModalOpen: false
		}
	},
	viewMessage: function(){

		this.setState({
			isModalOpen: true
		})
	},
	closeModal: function(){
		this.setState({
			isModalOpen: false
		})	
	},
	render: function(){

		var {activity} = this.props;
		var fromUser = activity.from;
		var toUser = activity.to;

		return (
			<li>
				<div className="media-item">
					<img src = {fromUser.image} />
				</div>
				<div className="media-content">
					<strong>{fromUser.name}</strong> {activity.action} to {toUser.role} <strong>{toUser.name}</strong>

					<div className="activity-meta">
						{activity.date}
						<a className="link-view-message"  onClick = {this.viewMessage}>Message</a>
					</div>
				</div>
				<Modal 
					isOpen = {this.state.isModalOpen}
					style={customStyles}
					onRequestClose={this.closeModal}
					>
					<div className="modal-dialog">
						<div className="modal-dialog-title">
							View Message
						</div>
						<div className="modal-dialog-body">
							<p>{activity.message}</p>

							<a onClick = {this.closeModal}>Close</a>
						</div>
					</div>
				</Modal>
			</li>
		)
	}
})

module.exports = BudgetActivity;