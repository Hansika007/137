objects = [];
video = "";
status1 = "";

function preload()
{
    video = createVideo("video.mp4");
    video.hide();
}

function setup()
{
    canvas = createCanvas(480 , 380);
    canvas.center();
}

function draw()
{
    image(video , 0 , 0 , 480 , 380);
    if (status1 != "")
    {
        objectDetector.detect(video , gotResult);
        for(i=0; i<objects.length ; i++)
        {
            document.getElementById("status").innerHTML = "STATUS : Object Detected" ; 
            document.getElementById("number_ of _objects").innerHTML = "Number of Objects are Detected : "+ objects.length ;
            
            fill("#0f0f0f");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " "+ percent + "%",objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width , objects[i].height);
        }
    }
}

function gotResult()
{
    if(error)
    {
        console.log(error);
    }

    console.log(results);
    objects = results;
}

function start()
{
    objectDetector = ml5.objectDetector('cocoSSD' , modelLoaded);
    document.getElementById("status").innerHTML = "STATUS : Object Detecting";
}

function modelLoaded()
{
    console.log("modelLoaded");
    status1 = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}