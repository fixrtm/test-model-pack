var renderClass = "jp.ngt.rtm.render.VehiclePartsRenderer";

var Parts = Packages.jp.ngt.rtm.render.Parts;
var RenderPass = Packages.jp.ngt.rtm.render.RenderPass;
var GL11 = Packages.org.lwjgl.opengl.GL11;

function init(par1, par2)
{
    body = renderer.registerParts(new Parts("Body"));
}

function render(entity, pass, par3)
{
    GL11.glPushMatrix();

    if(pass == RenderPass.NORMAL.id)
    {
        body.render(renderer);
    }

    GL11.glPopMatrix();
}
