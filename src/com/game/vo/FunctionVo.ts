/**
 * FunctionVO
 */
class FunctionVo 
{
    public fun:Function;
    public thisObject:any;
    public param:any[];
    constructor($fun:Function,$thisObject,...args) 
    {
        this.fun = $fun;
        this.thisObject = $thisObject;
        this.param = args;
    }

    public exec(...args):any
    {
        if(this.fun)
        {
            let tempParas:any[];
            if(this.param){
                tempParas = this.param.concat(args);
            }
            else {
                if(args) {
                    tempParas = args;
                }
            }
            return FunctionApply.doExecute(this.fun, this.thisObject, tempParas)
        }
        return undefined;
    }
}