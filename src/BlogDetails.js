import {useParams, useHistory} from 'react-router-dom';
import useFetch from './useFetch';


const BlogDetails = () => {
    const { id } = useParams()
    const {data: blog, isPending, error} = useFetch('http://localhost:8000/blogs/' + id)
    const history = useHistory();

    const handleClick = () => {
        fetch('http://localhost:8000/blogs/' + id, {
            method: 'DELETE'
        }).then(() => history.push('/'))
    }

    return ( 
        <div className="blog-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            { blog && 
                <article>
                    <h2>{blog.title} </h2>
                    <p>Writen by <span>{blog.author}</span></p>
                    <p>{blog.body}</p>
                    <button onClick={handleClick}>Delete</button>
                </article>
            }
        </div>
     );
}
 
export default BlogDetails;