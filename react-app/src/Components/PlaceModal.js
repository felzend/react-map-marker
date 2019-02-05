import $ from 'jquery';
import React, { Component } from 'react';
import { addPlace } from '../Actions';
import { connect } from 'react-redux';
import { setPlaceModalDescription} from '../Actions';
import { API_URL } from '../api';
import { handleApiErrors } from '../util';

const placeModalId = "place-modal";

class PlaceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {Lat: 0, Lng: 0, Description: ''};
  }
  componentWillReceiveProps(nextProps) {    
    $("#".concat(placeModalId)).modal('show');
    this.setState({Lat: nextProps.lat, Lng: nextProps.lng});
  }
  onDescriptionChange(e) {
    this.setState({Description: e.target.value});
  }
  formSubmit(e) {
    e.preventDefault();
    fetch(API_URL.concat("places"), {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state),
    })
    .then(response => handleApiErrors(response, "Local adicionado com sucesso!", "Falha ao adicionar local."))
    .then(data => {
      $("#".concat(placeModalId)).modal('hide');
      this.props.addPlace(this.state.Lat, this.state.Lng, this.state.Description);      
      alert("Local adicionado com sucesso!");
    });
  }
  
  render() {
    return (
      <div className="modal-component">
        <div className="modal fade" tabIndex="-1" role="dialog" id={placeModalId}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Adicionar Informações do Local</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.formSubmit.bind(this)}>
                  <div className="form-group">
                    <label htmlFor="lat">Latitude</label>
                    <input className="form-control" name="Lat" value={this.props.lat} disabled={true}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="lng">Longitude</label>
                    <input className="form-control" name="Lng" value={this.props.lng} disabled={true}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Descrição</label>
                    <input className="form-control" name="Description" onChange={this.onDescriptionChange.bind(this)} required={true}/>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-success btn-block">Salvar</button>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn brn-primary" data-dismiss="modal">Fechar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    placeModal: state.MappingReducer.placeModal,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addPlace: (lat, lng, description) => dispatch(addPlace(lat, lng, description)),
    setPlaceModalDescription: (description) => dispatch(setPlaceModalDescription(description)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceModal);