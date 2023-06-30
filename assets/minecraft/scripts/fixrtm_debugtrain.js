var renderClass = "jp.ngt.rtm.render.VehiclePartsRenderer";

var Parts = Packages.jp.ngt.rtm.render.Parts;
var RenderPass = Packages.jp.ngt.rtm.render.RenderPass;
var GL11 = Packages.org.lwjgl.opengl.GL11;
var TrainStateType = Packages.jp.ngt.rtm.entity.train.util.TrainState.TrainStateType;

function init(par1, par2)
{
    body = renderer.registerParts(new Parts("Body"));
}

var METER_PER_TICK_TO_KILO_METER_PER_HOUR = 72; // 1 / 1000 * 20 * 60 * 60

function render(entity, pass, par3)
{
    GL11.glPushMatrix();

    if(pass == RenderPass.NORMAL.id)
    {
        body.render(renderer);

        GL11.glPushMatrix();
        GL11.glTranslatef(0, 3, 0);
        GL11.glRotatef(-renderer.getYaw(entity), 0, 1, 0);
        GL11.glScalef(2, 2, 2);
        renderTexts([
            "f-dir: " + entity.formation.getEntry(entity).dir, 0,
            "dor: " + entity.getVehicleState(TrainStateType.Door), 0,
            "dir: " + entity.getVehicleState(TrainStateType.Direction), 0,
            "spd: " + entity.getSpeed() * METER_PER_TICK_TO_KILO_METER_PER_HOUR,
        ], 0, 0, 0)
        GL11.glPopMatrix();
    }

    GL11.glPopMatrix();
}

var Minecraft = Packages.net.minecraft.client.Minecraft;
var EntityRenderer = Packages.net.minecraft.client.renderer.EntityRenderer;
var minecraft = Minecraft[getName("func_71410_x", "getMinecraft")]();
//var minecraft = Minecraft.getMinecraft();

function renderTexts(texts, x, y, z) {
    var fontRenderer = minecraft[getName("field_71466_p", "fontRenderer")];
    var renderManager = minecraft[getName("func_175598_ae", "getRenderManager")]();
    var viewerYaw = renderManager[getName("field_78735_i", "playerViewY")];
    var viewerPitch = renderManager[getName("field_78732_j", "playerViewX")];
    var isThirdPersonFrontal = renderManager[getName("field_78733_k", "options")][getName("field_74320_O", "thirdPersonView")] === 2;
    var isSneaking = false;

    var verticalShift = (texts.length - 1) * -10;

    for (var i = 0; i < texts.length; i++, verticalShift += 10) {
        var text = texts[i]

        EntityRenderer[getName("func_189692_a", "drawNameplate")](fontRenderer, text, x, y, z,
            verticalShift, viewerYaw, viewerPitch, isThirdPersonFrontal, isSneaking)
    }
}

var cache;

function getName(srg, mcp) {
    if (Packages.net.minecraftforge.fml.relauncher.FMLLaunchHandler.isDeobfuscatedEnvironment())
        return mcp
    return srg;
}
