import React from 'react';
import BudgetNewQuestion from './BudgetNewQuestion';
import Fluxxor from 'fluxxor';
import {StoreWatchMixin} from 'fluxxor';
var FluxMixin = Fluxxor.FluxMixin(React)

var BudgetQuestions = React.createClass({
	mixins: [FluxMixin, StoreWatchMixin('BudgetDetailStore')],
	getStateFromFlux: function(){

		return {
			BudgetDetailStore: this.getFlux().store('BudgetDetailStore').getState()
		}
	},
	getInitialState: function(){

		return {
			editMode: false
		}
	},
	componentDidMount: function(){

		this.getFlux().actions.BudgetDetailActions.getQuestion(this.props.id)
		
	},
	onEdit: function(){

		this.getFlux().actions.BudgetDetailActions.getQuestion(this.props.id, () => {

			this.setState({
				editMode: true
			})
		});

	},
	render: function(){

		var {question} = this.state.BudgetDetailStore;

		if(this.state.editMode){

			return (
				<div>
					<BudgetNewQuestion 
						question = {question} 
						editMode = {this.state.editMode}
						budgetCutId = {this.props.id}
						onCancelForm = {()=> {
							this.setState({
								editMode: false
							})
						}}
						onFinishEdit = {()=> {
							this.setState({
								editMode: false
							})
						}}
					/>
					<hr className="rule" />
				</div>
			)
		}

		if(question.length){

			return (
				<div>
					<h4>Question details</h4>
					<table className="table table-budget-item table-budget-single">
						
						{question.map((q,idx) => {

							return (
								<tbody key = {idx}>
								<tr>
									<th>Details of question sourced</th>
									<td>{q.details}</td>
								</tr>
								<tr>
									<th>Attachment</th>
									<td>
										{q.attachments.map((attachment, index) => {
											return (
												<a href={attachment.downloadUrl} key = {index}>
													{attachment.fileName}
												</a>
											)
										})}
									</td>
								</tr>
								<tr>
									<th>HOD drafting reply</th>
									<td>{q.hodDrafting.name}</td>
								</tr>
								<tr>
									<th>Liason officer</th>
									<td>{q.liasonOfficer.name}</td>
								</tr>
								<tr>
									<td colSpan="2">
										<div className="activity-meta">
											{q.date}
											<a className="link-edit-question" onClick = {this.onEdit}>Edit</a>
										</div>
									</td>
								</tr>
								</tbody>
							)
						})}
						
					</table>					
					<hr className="rule" />
				</div>
			)
		}
		
		return (
			<div>
				<BudgetNewQuestion budgetCutId = {this.props.id} />
				<hr className="rule" />
			</div>
		)
	}
});

module.exports = BudgetQuestions;