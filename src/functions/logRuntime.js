export const logRuntime = () => {
  const start = new Date().getTime() / 1000;
  setTimeout(() => {  
    console.log(`Ran after ${new Date().getTime() / 1000 - start} seconds`);
  })
}
logRuntime();

