async function getAllPosts(){ //using this function to load the post 
    try {
        
            const options = {
                headers: new Headers({'Authorization': localStorage.getItem('token')}),
            }
        







//we have reference the options 

        const response = await fetch('http://localhost:3000/posts', options);
        const data = await response.json();
        return data;
    } catch (err) {
        console.warn(err);
    }

}