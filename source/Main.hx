import sys.Http;

function checkUpdate()
{
    var http = new Http("https://seuservidor.com/version.json");

    http.onData = function(data:String)
    {
        if (data != CURRENT_VERSION)
        {
            Sys.println("Nova versão disponível!");
        }
    }

    http.request();
}
