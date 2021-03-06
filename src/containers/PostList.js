import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { pending, rejected } from 'redux-saga-thunk'
import { fromEntities, fromResource } from 'store/selectors'
import { resourceListReadRequest } from 'store/actions'

import { PostList } from 'components'

class PostListContainer extends Component {
  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    const { readList } = this.props
    readList()
  }

  render() {
    const { list, loading, failed } = this.props
    return <PostList {...{ list, loading, failed }} />
  }
}

const mapStateToProps = (state) => ({
  list: fromEntities.getList(
    state,
    'posts',
    fromResource.getList(state, 'posts'),
  ),
  loading: pending(state, 'postsListRead'),
  failed: rejected(state, 'postsListRead'),
})

const mapDispatchToProps = (dispatch, { limit }) => ({
  readList: () => dispatch(resourceListReadRequest('posts', { _limit: limit })),
})

PostListContainer.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  limit: PropTypes.number,
  loading: PropTypes.bool,
  failed: PropTypes.bool,
  readList: PropTypes.func.isRequired,
}

PostListContainer.defaultProps = {
  limit: 20,
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListContainer)
