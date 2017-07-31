const React = require('react');
const { connect } = require('react-redux');
const PhotoActions = require('../actions/photo-actions');


class HomeLayout extends React.Component {
    render () {
        return (
            <div>
                Hello
                <button onClick={this.props.loadPhoto}>Load photo</button>

                {this.props.isLoading &&
                    <div>LOADING...</div>
                }

                {this.props.photo &&
                    <div>
                        <img src={this.props.photo.get('url')} />
                    </div>
                }
            </div>
        )
    }
}

// This data comes from the reducers. These will be available as props in the Component above.

const mapStateToProps = (state) => {
    return {
        isLoading: state.getIn(['photo', 'is_loading']),
        photo: state.getIn(['photo', 'data'])
    };
};

// These functions come from the actions. These will be available as props in the Component above.

const mapDispatchToProps = (dispatch) => {
    return {
        loadPhoto () {
            dispatch(PhotoActions.loadPhoto());
        }
    };
};


module.exports = connect(mapStateToProps, mapDispatchToProps)(HomeLayout);
module.exports.HomeLayout = HomeLayout;
