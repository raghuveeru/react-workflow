import React from 'react';

var InputFileMaterial = React.createClass({	
	render: function(){

		return (
			<div className='form-control'>				
				<label className="material-file">
					<input type="file" name={this.props.name} multiple={true} />
				</label>
				<span className="text-hint">Max per file size limit is 4 MB.  To select multiple files, press Ctrl (PC) or Command (Mac) and click all the files to upload.</span>
			</div>
		)
	}
});

module.exports = InputFileMaterial;