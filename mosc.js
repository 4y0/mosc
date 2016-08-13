var MoscBase = function (evaluation_context_dictionary)
{
	this.eval_ctx_dict = evaluation_context_dictionary;
	this.baseObject    = {};
	this.noMoreChain   = false;

	this.parse_properties = function (key, properties, eval_dict)
	{
		function get_eval_string(path) {
			var eval_prop = path.match(/\*([a-zA-Z_0-9]+)\*/)[1];
			return 'eval_dict["'+eval_prop+'"]' + path.replace(/\*[a-zA-Z_0-9]+\*/, '');
		}

		var propertyBase      = {}; 
		propertyBase[key]     = !this.baseObject[key] ? {} : this.baseObject[key];
		properties            = properties.split(',');
		var properties_length = properties.length;
		var property_parts    = null;

		for(var i = 0; i < properties_length; i++)
		{
			properties[i]     = properties[i].trim();
		    property_parts    = properties[i].split(':');
		    property_parts[0] = property_parts[0].trim();
		    var pvalue        = property_parts[1].trim();
		    if(pvalue.indexOf('*') < 0){
		    	propertyBase[key][property_parts[0]] = pvalue;
		    }
		    else
		    {
		    	propertyBase[key][property_parts[0]] = eval(get_eval_string(pvalue));
		    }
			 
		} 
		return propertyBase[key];
	}

	this.chain = function (property_key, properties) 
	{
		this.baseObject[property_key] = this.parse_properties(property_key, properties, this.eval_ctx_dict);
		return this.noMoreChain ? this.baseObject : this;
	}

	this.end = function () 
	{
		this.noMoreChain = true;
		return this.baseObject;
	}

}
module.exports = MoscBase;

/*var Sequelize = {string:'SEQUELIZE_STRING',integer:'SEQUELIZE_INTEGER'};
var eval_dict = {'SEQ':Sequelize}
var mocbasetest = new MoscBase(eval_dict);
mocbasetest.chain('id','type:*SEQ*.string, primarykey:true, unique:true')
		   .chain('id', 'autoIncrement:940')
		   .chain('firstName','type:*SEQ*.string, primarykey:true, unique:true')
		   .chain('mobileNumber','type:*SEQ*.integer,unique:true')
		   .end();*/

