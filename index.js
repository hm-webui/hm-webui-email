var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var Q = require('q');

var SMTPMailPlugin  = function(options){
  var log = null;

  this.logger = function(logger){
    log = logger;
  };

  this.sendMail = function(from,to,subject,message){
    var deferred = Q.defer();
    
    var m = (typeof from=='object') ? from : {from: from, to: to, subject: subject, message: message};

    process.nextTick(function(){
      if(!m.from){
        deferred.reject("Could not send mail - no from address provided");
      }else if(!m.from.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/)){
        deferred.reject("Could not send mail - from address '" + m.from + "' not valid");
      }else if(!m.to){
        deferred.reject("Could not send mail - no to address provided");
      }else if(!m.to.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/)){
        deferred.reject("Could not send mail - to address '" + m.to + "' not valid");
      }else if(!m.subject){
        deferred.reject("Could not send mail - no subject provided");
      }else if(!m.message){
        deferred.reject("Could not send mail - no message provided");
      }else{
        var auth = null;

        if(options.user){
          log.debug("User is defined - init authentication");

          auth = { user: options.user };
          if(options.password)
          auth.pass = options.password;
        }

        var transporter = nodemailer.createTransport(smtpTransport({
          host: options.host,
          port: options.port || 25,
          auth: auth,
          tls: {rejectUnauthorized: !options.ignoreWrongCertificate},
        }));

        transporter.sendMail({
          from: m.from,
          to: m.to,
          subject: m.subject,
          text: m.message
        }, function(error) {
          if (error) {
            deferred.reject("Mail sending to " + m.to + " failed - " + error);
          } else {
            deferred.resolve(m);
          }
        });
      }
    });

    return deferred.promise;
  };

};

module.exports = SMTPMailPlugin;
