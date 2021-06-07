import React, { Fragment } from 'react'

export default ({loading, error, children}) => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    return <Fragment>{children}</Fragment>;
}
