import React from 'react'
import { Route, Switch, Redirect } from 'react-router'

import RoutingTable from '../Config/authRoutingTable'
import useAuth from '../hooks/useAuth'

export default () => {

    // state.auth.authenticatedの確認
    const { authenticated } = useAuth();
    let contentList = { guest:[], member:[] }
    for(let key in RoutingTable) {
        let routeProps = {
            key,
            path:RoutingTable[key].path,
            component: RoutingTable[key]['component'],
            exact: RoutingTable[key].exact
        }
        contentList[RoutingTable[key].mode].push(<Route {...routeProps} />)

    }

    let currentContentList = []
    let currentRedirect = ""
    if(!authenticated) {
        currentContentList = contentList['guest']
        currentRedirect = "/login"
    }
    else
    {
        currentContentList = contentList['member']
        currentRedirect = "/"
    }
    return (
        <Switch>
            {currentContentList}
            <Redirect to={currentRedirect} />
        </Switch>
    )

}