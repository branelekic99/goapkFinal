import React , {Component} from 'react';
import {getDetail} from '../actions/odmor';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router-dom';

class Detail extends Component{
    componentDidMount(){
        const { id } = this.props.match.params;
        this.props.getDetail(id);
    }
    render(){
        const edit="edit/"+this.props.itemDetail.id;
        return(
            <div>
                <fieldset className="border p-2">
                <legend className="w-auto">Detail</legend>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Zaposleni</label>
                            <input type="text" value={this.props.itemDetail.zaposleni} className="form-control" readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Pocetak odmora</label>
                            <input type="date" name='poc_odmora' value={this.props.itemDetail.poc_odmora} className="form-control" readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Kraj odmora</label>
                            <input type="date" name='kraj_odmora' value={this.props.itemDetail.kraj_odmora} className="form-control" readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Prvi radni dan</label>
                            <input type="date" name='prvi_radni_dan' value={this.props.itemDetail.prvi_radni_dan} className="form-control" readOnly/>
                        </div>
                        <div className="form-group">
                            <label>Status zahtjeva</label>
                            <input type="text" value={this.props.itemDetail.status_zahteva} name='status_zahteva'className="form-control" readOnly />
                        </div>
                        {this.props.itemDetail.prilog?<div className="form-group">
                            <label>prilog</label>
                            <input type="text" value={this.props.itemDetail.prilog} name='prilog'className="form-control" readOnly />
                        </div>:""}
                        
                        <div className="form-group">
                            <label>Odobrio</label>
                            <input type="text" value={this.props.itemDetail.odobrio} name='odobrio' className="form-control" readOnly/>
                        </div>
                    </form>
                </fieldset>
            </div>
        )
    }
}
Detail.propTypes = {
	getDetail:PropTypes.func.isRequired,
    itemDetail:PropTypes.array.isRequired
}
const mapStateToProps = state=>({
	itemDetail:state.odmor.detail
});
export default connect(mapStateToProps,{getDetail})(Detail);