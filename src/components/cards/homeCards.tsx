import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ShareIcon from '@mui/icons-material/Share';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
// import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';

import homeImg from ".//..//..//pages/navbar/home/homeImg.jpg";

// type PostCardProps = {
//     id:string
//     post: any
//     handleClickOpen: any
//     handleClickOpenDelete: any
//     handleFavoriteClick: any
//     fav: string
//     handleExpandClick: any
//     expandedId: string
// }


export function PostCard (){
 

    return (
        <div>
        <Card sx={{ minWidth: 275, marginBottom: '40px',marginTop: '20px' , border: 1, width: '350px',
        }}>
        <CardMedia
        sx={{ height: 170 }}
        image ={homeImg}
        title="post"
        />
        <CardContent sx={{ backgroundColor: '#F2F2F2' }}>
        <Typography variant="h5" sx={{ marginBottom: '10px' }}>
            title: 
        </Typography>
        <Typography variant="body2" color="text.secondary" >
            body: 
        </Typography>


        <CardActions disableSpacing>

        {/* <IconButton 
            aria-label="add to favorites" 
            onClick={() => props.handleFavoriteClick(props.id)}
            style={{ color: props.fav === props.id ? 'red' : 'initial' }}
            >
            {/* <FavoriteIcon /> */}
        {/* </IconButton>    */}
        
        <IconButton aria-label="share" >
            {/* <ShareIcon /> */}
        </IconButton>

        {/* <IconButton
            title="Edit Post"
            size="large"
            onClick={() => props.handleClickOpen(props.id)}
            > */}
        {/* <EditIcon /> */}
        {/* </IconButton> */}

        <IconButton
            title="Delete Post"
            size="large"
            // onClick={() => props.handleClickOpenDelete(props.id)}
        >
        {/* <DeleteForeverIcon /> */}
        </IconButton>

        {/* <ExpandMore
            expand={props.expandedId===props.id}
            id={props.id}
            onClick={() => props.handleExpandClick(props.id)}
            aria-expanded={props.expandedId === props.id}
            aria-label="show more"
        > */}
            {/* <ExpandMoreIcon /> */}
        {/* </ExpandMore>  */}
        <Button size="small">EXPAND</Button>
        </CardActions> 
        {/* <Collapse in={props.expandedId===props.id} timeout="auto" unmountOnExit> */}
        <CardContent>
            <Typography paragraph>
            ID: 
            </Typography>
        </CardContent>
        {/* </Collapse>  */}
        </CardContent>
        </Card>
        </div>
    )
}

export default PostCard;