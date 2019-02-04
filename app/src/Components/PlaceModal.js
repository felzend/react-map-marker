import $ from 'jquery';
import React, { Component } from 'react';
import { addPlace } from '../Actions';
import { connect } from 'react-redux';
import { setPlaceModalDescription} from '../Actions';

class PlaceModal extends Component {
  constructor(props) {
    super(props);
    this.state = { placeModal: "place-modal" };
  }
  componentWillReceiveProps(nextProps) {
    if( this.props.placeModal.lat !== nextProps.placeModal.lat || this.props.placeModal.lng !== nextProps.placeModal.lng ) {
      $("#" + this.state.placeModal).modal('show');
    }
  }
  submitForm(e) {
    e.preventDefault();
    var data = {
      Lat: this.props.placeModal.lat,
      Lng: this.props.placeModal.lng,
      Description: this.props.placeModal.description,
    }

    fetch("http://localhost:49856/api/Places/Add", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(json => {
      this.props.addPlace(data.Lat, data.Lng, data.Description);
      $("#" + this.state.placeModal).modal('hide');
      alert("Local adicionado com sucesso!");
    });
  }
  handleDescription(e) {
    this.props.setPlaceModalDescription(e.target.value);
  }
  render() {
    return (
      <div className="modal-component">
        <div className="modal fade" tabIndex="-1" role="dialog" id={this.state.placeModal}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Adicionar Informações do Local</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.submitForm.bind(this)}>
                  <div className="form-group">
                    <label htmlFor="lat">Latitude</label>
                    <input className="form-control" value={this.props.placeModal.lat} disabled={true}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="lng">Longitude</label>
                    <input className="form-control" value={this.props.placeModal.lng} disabled={true}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Descrição</label>
                    <input className="form-control" onChange={this.handleDescription.bind(this)} required={true}/>
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-success btn-block">Salvar</button>
                    <button type="button" className="btn btn-danger btn-block">Apagar</button>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-warning" data-dismiss="modal">Fechar</button>
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