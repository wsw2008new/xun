/**
 * 
 */
package org.adaikiss.xun.chat.oio;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandler.Sharable;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.channel.group.ChannelGroup;
import io.netty.channel.group.DefaultChannelGroup;
import io.netty.util.concurrent.GlobalEventExecutor;

import java.util.Date;

import org.adaikiss.xun.netty.chat.proto.MessageProto.Message;
import org.adaikiss.xun.netty.chat.proto.MessageProto.Message.MessageType;
import org.adaikiss.xun.netty.chat.proto.MessageProto.Message.User;

/**
 * @author hlw
 *
 */
@Sharable
public class ChatServerHandler extends SimpleChannelInboundHandler<Message> {

	protected ChannelGroup channels = new DefaultChannelGroup(GlobalEventExecutor.INSTANCE);
	private ChatServer server;
//	private BlockingQueue<MessageTuple> msgQueue;

	public ChatServerHandler(ChatServer server){
		this.server = server;
//		msgQueue = new LinkedBlockingQueue<MessageTuple>();
//		new Thread(){
//
//			@Override
//			public void run() {
//				try {
//					while(true){
//						MessageTuple t = msgQueue.take();
//						writeToAll(t.msg, t.c);
//					}
//				} catch (InterruptedException e) {
//					e.printStackTrace();
//				}
//			}
//			
//		}.start();
	}

	@Override
	public void channelActive(ChannelHandlerContext ctx) throws Exception {
		channels.add(ctx.channel());
	}

	@Override
	public void channelInactive(ChannelHandlerContext ctx) throws Exception {
	}

	@Override
	public void channelRead0(ChannelHandlerContext ctx, Message msg)
			throws Exception {
		System.out.println(msg.getContent());
//		if("jetty".equals(msg.getUser().getName()) && count++%2 == 0){
//			Thread.sleep(6000);
//		}
		writeToAll(msg, ctx.channel());
//		msgQueue.put(new MessageTuple(msg, ctx.channel()));
	}

	@Override
	public void channelReadComplete(ChannelHandlerContext ctx) throws Exception {
		super.channelReadComplete(ctx);
	}

	@Override
	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause)
			throws Exception {
		cause.printStackTrace();
		ctx.close();
	}

	protected void writeToAll(Message msg, Channel channel){
		switch(msg.getType()){
		case Chat:
		case Notice:
			channels.flushAndWrite(msg);
			server.window.showMsg(msg.getUser().getName() + ":" + msg.getContent());
			break;
		case Login:
			Message loginMsg = Message.newBuilder().setType(MessageType.Notice).setTime(new Date().getTime()).setContent("welcome!").setUser(User.newBuilder().setName("system").setSystem(true)).build();
			server.window.showMsg(msg.getUser().getName() + " joined!");
			writeTo(msg, channel, loginMsg);
			break;
		case Logout:
			Message logoutMsg = Message.newBuilder().setType(MessageType.Notice).setTime(new Date().getTime()).setContent("bye!").setUser(User.newBuilder().setName("system").setSystem(true)).build();
			server.window.showMsg(msg.getUser().getName() + " left!");
			writeTo(msg, channel, logoutMsg);
			channel.close();
			break;
		}
//		for(Channel c : channels){
//			c.writeAndFlush(msg);
//		}
	}

	protected void writeToAll(Message msg){
		writeToAll(msg, null);
	}

	private void writeTo(Message normalMsg, Channel particularChannel, Message particularMsg){
		for(Channel c : channels){
			if(c.equals(particularChannel)){
				if(null != particularMsg){
					c.writeAndFlush(particularMsg);
				}
				continue;
			}
			c.writeAndFlush(normalMsg);
		}
	}
	class MessageTuple{
		public Message msg;
		public Channel c;
		public MessageTuple(Message msg, Channel c){
			this.msg = msg;
			this.c = c;
		}
	}
}
