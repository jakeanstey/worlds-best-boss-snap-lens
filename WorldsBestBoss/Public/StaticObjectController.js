// -----JS CODE-----
//@input bool useGroundGrid
//@input Asset.Material touchCollisionMaterial
//@input SceneObject groundGrid
//@input Component.WorldTracking worldTrackingComponent
var originalPosition = script.getSceneObject().getTransform().getLocalPosition();

if(script.getSceneObject().getComponentCount("Component.TouchComponent") > 0)
{
    script.getSceneObject().getFirstComponent("Component.TouchComponent").addTouchBlockingException("TouchTypeDoubleTap");
}

if(!script.useGroundGrid && script.groundGrid)
{   
    script.groundGrid.enabled = false;    
}

// Hides the touchCollision object when lens is running by setting the alpha on its material to 0
if(script.touchCollisionMaterial)
{
    script.touchCollisionMaterial.mainPass.baseColor = new vec4(1,1,1,0);
}

// Event and callback setup  
function onSurfaceReset(eventData)
{
    script.getSceneObject().getTransform().setLocalPosition(originalPosition);
    setTrackingTarget();
}
var worldTrackingResetEvent = script.createEvent("WorldTrackingResetEvent");
worldTrackingResetEvent.bind(onSurfaceReset);

function onFrontCamEvent(eventData)
{
    for(var i = 0; i < script.getSceneObject().getChildrenCount(); i++)
    {
        var childObject = script.getSceneObject().getChild(i);
        if(childObject)
        {
            childObject.enabled = false;
        }
    }        
}
var cameraFrontEvent = script.createEvent("CameraFrontEvent");
cameraFrontEvent.bind(onFrontCamEvent);

function onBackCamEvent(eventData)
{
    for(var i = 0; i < script.getSceneObject().getChildrenCount(); i++)
    {
        var childObject = script.getSceneObject().getChild(i);
        if(childObject)
        {
            childObject.enabled = true;                   
        }
    }
    if(!script.useGroundGrid && script.groundGrid)
    {
        script.groundGrid.enabled = false;
    }  
}
var cameraBackEvent = script.createEvent("CameraBackEvent");
cameraBackEvent.bind(onBackCamEvent);

function setTrackingTarget()
{
    if(script.worldTrackingComponent)
    {
        script.worldTrackingComponent.surfaceTrackingTarget = script.getSceneObject();
    }
}
setTrackingTarget();