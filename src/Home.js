import { useState, useEffect } from 'react';
import BlogList from './BlogList';

const Home = () => {
    //let name = 'mario'
    // const [name, setName] = useState('mario'); // re-render the entire component
    // const [age, setAge] = useState(25);

    // const handleClick = () => {
    //     setName('luigi');
    //     setAge(30)
    // }

    // const handleClickAgain = (e) => {
    //     console.log('hello, ninjas', e.target)
    // }
    // const boolean = true;

    const [blogs, setBlogs] = useState(null);
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    // const [name, setName] = useState('mario')

    // const handleDelete = (id) => {
    //     setBlogs(blogs.filter(blog => blog.id !== id))
    // }

    // const myFunction = () => {
    //     fetch('http://localhost:8000/blogs')
    //      .then(res => res.json())
    //      .then(data => {
    //         console.log(data)
    //         setBlogs(data)
    //      })
    // }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:8000/blogs')
                .then(res => {
                    if(!res.ok){
                        throw Error('Could not fetch the data for that resource'); // throwing error to be catched by catch below
                    }
                    return res.json()
                })
                .then(data => {
                    setBlogs(data)
                    setIsPending(false)
                    setError(null);
                })
                .catch((e) => {
                    setError(e.message);
                    setIsPending(false);
                })
        }, 1000)
    }, []) // myFunction executes when component first renders (twice because React Strict Mode is active, but once in production)

    // useEffect(myFunction, [name])

    // const handleClick = () => {
    //     const newBlog = {title: 'My title', body: 'Body', author: 'Mari'}
    //     setBlogs([...blogs, newBlog])
    // }

    return (
        <div className="home">
            {error && <div>{ error }</div>}
            {isPending && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} title="All Blogs" />}


            {/* <button onClick={() => setName('luigi')}>Change Name</button>
            <p>{ name }</p>
             */}

            {/* <BlogList blogs={blogs.filter(blog => blog.author === "mario")} title="Marios's blogs" /> */}

            {/* <button onClick={handleClick}>Adicionar mais um blog</button> */}

            {/* <h2>Homepage</h2>
            <p>{ name } is { age } years old</p>

            <button onClick={handleClick}>Click Me</button>
            <button onClick={() => handleClickAgain('mario')}>Clock me again</button> */}
        </div>
    );
}

export default Home;