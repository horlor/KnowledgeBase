import React from "react";
import { Box, Button, withStyles } from "@material-ui/core";

interface IProps{
    pageNum : number,
    current: number,
    pageChanged: (from: number, to: number) => void | undefined,
}

const start = 1;
const shown = 2;


const PageButton = withStyles(
    {root:
        {minWidth:"0px"},
    label:{
        fontSize:"1.2rem"
    }
                    })(Button)

const Pagination : React.FC<IProps> = (props) => {
    let show_start : boolean = (props.current-shown) > start;
    let show_end = (props.pageNum - shown) > props.current;

    let arraybefore : number[] = [];
    for(let i=props.current-shown; i<props.current;i++ )
    if(i>=1)
        arraybefore.push(i);

    let arrayAfter : number [] = [];
    for(let i=props.current+1;i<=props.current+shown && i<= props.pageNum; i++)
        arrayAfter.push(i);
    const points = <PageButton disabled>...</PageButton>

    const ChangePage = (to: number) => {
        props.pageChanged(props.current, to);
    }

    if(props.pageNum<=1)
    return <></>;
    if(props.current > props.pageNum)
        return <PageButton onClick={()=>ChangePage(1)} >The selected page dose not exist, return too page 1</PageButton>;
    return (
        <Box display="flex" flexDirection="row" justifyContent="center">
            {
                show_start?
                <>
                 <PageButton onClick={()=>ChangePage(1)}>1</PageButton>
                 {arraybefore[0] !== 2 ?points:""}
                </>
               :
               ""
            }
            {   arraybefore.map(item => <PageButton key={item} onClick={()=>ChangePage(item)}>{item}</PageButton> ) }
            <PageButton disabled>{props.current}</PageButton>
            {   arrayAfter.map(item => <PageButton key={item} onClick={()=>ChangePage(item)}>{item}</PageButton> )}
            {
            show_end?
            <>
            {arrayAfter[arrayAfter.length-1] !== props.pageNum-1 ? points : ""}
            <PageButton onClick={()=>ChangePage(props.pageNum)}>{props.pageNum}</PageButton>
            </>
            :
            ""
            }
        </Box>
    );
}


Pagination.defaultProps = {
    pageNum : 5,
    current : 1,
    pageChanged: ()=>{}
}

export default Pagination;