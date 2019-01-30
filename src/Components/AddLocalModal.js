import $ from 'jquery';
import React, { Component } from 'react'

export default class AddLocalModal extends Component {
  constructor(props) {
    super(props);
    this.state = { description: '' };
    this.handleDescription = this.handleDescription.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if( this.props.lat !== nextProps.lat || this.props.lng !== nextProps.lng ) {
      $("#add-local-modal").modal();
    }
  }
  validateForm(e) {
    e.preventDefault();
    console.log(this.state.description);
  }
  handleDescription(e) {
    this.setState({description: e.target.value});
  }
  render() {
    return (
      <div className="modal-component">
        <div className="modal fade" tabIndex="-1" role="dialog" id="add-local-modal">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Adicionar Informações do Local</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.validateForm}>
                  <div className="form-group">
                    <label htmlFor="lat">Latitude</label>
                    <input className="form-control" value={this.props.lat} disabled={true}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="lng">Longitude</label>
                    <input className="form-control" value={this.props.lng} disabled={true}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Descrição</label>
                    <input className="form-control" value={this.state.description} onChange={this.handleDescription} required={true}/>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-success">Salvar</button>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal">Fechar</button>                
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
  