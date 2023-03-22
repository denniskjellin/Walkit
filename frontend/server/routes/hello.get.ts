export default defineEventHandler(event => {
    const query = getQuery(event)
  
    return {
        api: 'Hello from routes folder',
        
    };
})