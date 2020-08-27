import React from 'react';
import { Box, Hidden, Grid } from '@material-ui/core';
import { useUserListHook } from '../../hooks/UserHooks';
import LoadingView from '../common/LoadingView';
import ErrorView from '../common/ErrorView';
import UserCard from '../user/UserCard';
import Pagination from '../common/Pagination';
import { RouteComponentProps } from 'react-router-dom';
import { UrlBuilder } from '../../helpers/UrlBuilder';


type IProps = RouteComponentProps<{

}>;

const UserPage : React.FC<IProps> = (props) =>{
    const queryParams = new URLSearchParams(props.location.search);
	const search = queryParams.get("search"), pagestr = queryParams.get("page"), pageSize = queryParams.get("pageSize"); 
    const {users, error, loading, pageCount, page} = useUserListHook(parseInt(pagestr || '1'), parseInt(pageSize || '12'),search || '');
    if(loading)
        return <LoadingView></LoadingView>;
    if(error)
        return <ErrorView title={error.code} message={error.description}/>;
    return (
        <>
        <Grid container>
                    {
                        users.map( user => 
                            <Grid item xs={12} md={6}  lg={4} xl={3} key={user.userName}>

                        <UserCard 
                                user={user}
                                to={`/users/${user.userName}`}
                        />
                        </Grid>
                        )
                    }
                    <Grid item xs={12}>
                        <Pagination pageChanged={(from, to)=>{
                        let url = new UrlBuilder("/users")
                        url.appendWithQueryParam("search",search)
                        url.appendWithQueryParam("pageSize",pageSize)
                        url.appendWithQueryParam("page",to);
                        props.history.push(url.get());
                    }} pageNum={page} current={pageCount || 2} />
                    </Grid>
            </Grid>
        </>
    );
}


export default UserPage;