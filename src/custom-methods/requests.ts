export class Requests{

  // CREATE
  httpPost(url: string, data: any): void{
    fetch(url, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(res => {
      console.log("Request complete! response:", res);
    });
  }

  // READ
  httpGet(url: string): any{

    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return xmlHttp.responseText;
  }

  // UPDATE
  httpPut(url: string, data: any): void{
    fetch(url, {
      method: "PUT",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).then(res => {
      console.log("Request complete! response:", res);
    });
  }
  
  // DELETE
  httpDelete(url: string): void{
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("DELETE", url, false);
    xmlHttp.send(null);
  }

}
