// Code generated by protoc-gen-gogo. DO NOT EDIT.
// source: stream.proto

package gen

import proto "github.com/gogo/protobuf/proto"
import fmt "fmt"
import math "math"
import _ "github.com/gogo/protobuf/gogoproto"
import _ "github.com/gogo/protobuf/types"
import _ "github.com/gogo/protobuf/types"

import (
	context "golang.org/x/net/context"
	grpc "google.golang.org/grpc"
)

import io "io"

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

type StreamPayload_Event int32

const (
	StreamPayload_NEW    StreamPayload_Event = 0
	StreamPayload_MOD    StreamPayload_Event = 1
	StreamPayload_DELETE StreamPayload_Event = 2
)

var StreamPayload_Event_name = map[int32]string{
	0: "NEW",
	1: "MOD",
	2: "DELETE",
}
var StreamPayload_Event_value = map[string]int32{
	"NEW":    0,
	"MOD":    1,
	"DELETE": 2,
}

func (x StreamPayload_Event) String() string {
	return proto.EnumName(StreamPayload_Event_name, int32(x))
}
func (StreamPayload_Event) EnumDescriptor() ([]byte, []int) { return fileDescriptorStream, []int{0, 0} }

type StreamPayload struct {
	Event StreamPayload_Event `protobuf:"varint,1,opt,name=event,proto3,enum=stream.StreamPayload_Event" json:"event,omitempty"`
	// Types that are valid to be assigned to Object:
	//	*StreamPayload_Entity
	//	*StreamPayload_Rel
	Object isStreamPayload_Object `protobuf_oneof:"object"`
}

func (m *StreamPayload) Reset()                    { *m = StreamPayload{} }
func (m *StreamPayload) String() string            { return proto.CompactTextString(m) }
func (*StreamPayload) ProtoMessage()               {}
func (*StreamPayload) Descriptor() ([]byte, []int) { return fileDescriptorStream, []int{0} }

type isStreamPayload_Object interface {
	isStreamPayload_Object()
	MarshalTo([]byte) (int, error)
	Size() int
}

type StreamPayload_Entity struct {
	Entity *Entity `protobuf:"bytes,2,opt,name=entity,oneof"`
}
type StreamPayload_Rel struct {
	Rel *Rel `protobuf:"bytes,3,opt,name=rel,oneof"`
}

func (*StreamPayload_Entity) isStreamPayload_Object() {}
func (*StreamPayload_Rel) isStreamPayload_Object()    {}

func (m *StreamPayload) GetObject() isStreamPayload_Object {
	if m != nil {
		return m.Object
	}
	return nil
}

func (m *StreamPayload) GetEntity() *Entity {
	if x, ok := m.GetObject().(*StreamPayload_Entity); ok {
		return x.Entity
	}
	return nil
}

func (m *StreamPayload) GetRel() *Rel {
	if x, ok := m.GetObject().(*StreamPayload_Rel); ok {
		return x.Rel
	}
	return nil
}

// XXX_OneofFuncs is for the internal use of the proto package.
func (*StreamPayload) XXX_OneofFuncs() (func(msg proto.Message, b *proto.Buffer) error, func(msg proto.Message, tag, wire int, b *proto.Buffer) (bool, error), func(msg proto.Message) (n int), []interface{}) {
	return _StreamPayload_OneofMarshaler, _StreamPayload_OneofUnmarshaler, _StreamPayload_OneofSizer, []interface{}{
		(*StreamPayload_Entity)(nil),
		(*StreamPayload_Rel)(nil),
	}
}

func _StreamPayload_OneofMarshaler(msg proto.Message, b *proto.Buffer) error {
	m := msg.(*StreamPayload)
	// object
	switch x := m.Object.(type) {
	case *StreamPayload_Entity:
		_ = b.EncodeVarint(2<<3 | proto.WireBytes)
		if err := b.EncodeMessage(x.Entity); err != nil {
			return err
		}
	case *StreamPayload_Rel:
		_ = b.EncodeVarint(3<<3 | proto.WireBytes)
		if err := b.EncodeMessage(x.Rel); err != nil {
			return err
		}
	case nil:
	default:
		return fmt.Errorf("StreamPayload.Object has unexpected type %T", x)
	}
	return nil
}

func _StreamPayload_OneofUnmarshaler(msg proto.Message, tag, wire int, b *proto.Buffer) (bool, error) {
	m := msg.(*StreamPayload)
	switch tag {
	case 2: // object.entity
		if wire != proto.WireBytes {
			return true, proto.ErrInternalBadWireType
		}
		msg := new(Entity)
		err := b.DecodeMessage(msg)
		m.Object = &StreamPayload_Entity{msg}
		return true, err
	case 3: // object.rel
		if wire != proto.WireBytes {
			return true, proto.ErrInternalBadWireType
		}
		msg := new(Rel)
		err := b.DecodeMessage(msg)
		m.Object = &StreamPayload_Rel{msg}
		return true, err
	default:
		return false, nil
	}
}

func _StreamPayload_OneofSizer(msg proto.Message) (n int) {
	m := msg.(*StreamPayload)
	// object
	switch x := m.Object.(type) {
	case *StreamPayload_Entity:
		s := proto.Size(x.Entity)
		n += proto.SizeVarint(2<<3 | proto.WireBytes)
		n += proto.SizeVarint(uint64(s))
		n += s
	case *StreamPayload_Rel:
		s := proto.Size(x.Rel)
		n += proto.SizeVarint(3<<3 | proto.WireBytes)
		n += proto.SizeVarint(uint64(s))
		n += s
	case nil:
	default:
		panic(fmt.Sprintf("proto: unexpected type %T in oneof", x))
	}
	return n
}

func init() {
	proto.RegisterType((*StreamPayload)(nil), "stream.StreamPayload")
	proto.RegisterEnum("stream.StreamPayload_Event", StreamPayload_Event_name, StreamPayload_Event_value)
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConn

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion4

// Client API for StreamService service

type StreamServiceClient interface {
	Receive(ctx context.Context, in *Empty, opts ...grpc.CallOption) (StreamService_ReceiveClient, error)
}

type streamServiceClient struct {
	cc *grpc.ClientConn
}

func NewStreamServiceClient(cc *grpc.ClientConn) StreamServiceClient {
	return &streamServiceClient{cc}
}

func (c *streamServiceClient) Receive(ctx context.Context, in *Empty, opts ...grpc.CallOption) (StreamService_ReceiveClient, error) {
	stream, err := grpc.NewClientStream(ctx, &_StreamService_serviceDesc.Streams[0], c.cc, "/stream.StreamService/Receive", opts...)
	if err != nil {
		return nil, err
	}
	x := &streamServiceReceiveClient{stream}
	if err := x.ClientStream.SendMsg(in); err != nil {
		return nil, err
	}
	if err := x.ClientStream.CloseSend(); err != nil {
		return nil, err
	}
	return x, nil
}

type StreamService_ReceiveClient interface {
	Recv() (*StreamPayload, error)
	grpc.ClientStream
}

type streamServiceReceiveClient struct {
	grpc.ClientStream
}

func (x *streamServiceReceiveClient) Recv() (*StreamPayload, error) {
	m := new(StreamPayload)
	if err := x.ClientStream.RecvMsg(m); err != nil {
		return nil, err
	}
	return m, nil
}

// Server API for StreamService service

type StreamServiceServer interface {
	Receive(*Empty, StreamService_ReceiveServer) error
}

func RegisterStreamServiceServer(s *grpc.Server, srv StreamServiceServer) {
	s.RegisterService(&_StreamService_serviceDesc, srv)
}

func _StreamService_Receive_Handler(srv interface{}, stream grpc.ServerStream) error {
	m := new(Empty)
	if err := stream.RecvMsg(m); err != nil {
		return err
	}
	return srv.(StreamServiceServer).Receive(m, &streamServiceReceiveServer{stream})
}

type StreamService_ReceiveServer interface {
	Send(*StreamPayload) error
	grpc.ServerStream
}

type streamServiceReceiveServer struct {
	grpc.ServerStream
}

func (x *streamServiceReceiveServer) Send(m *StreamPayload) error {
	return x.ServerStream.SendMsg(m)
}

var _StreamService_serviceDesc = grpc.ServiceDesc{
	ServiceName: "stream.StreamService",
	HandlerType: (*StreamServiceServer)(nil),
	Methods:     []grpc.MethodDesc{},
	Streams: []grpc.StreamDesc{
		{
			StreamName:    "Receive",
			Handler:       _StreamService_Receive_Handler,
			ServerStreams: true,
		},
	},
	Metadata: "stream.proto",
}

func (m *StreamPayload) Marshal() (dAtA []byte, err error) {
	size := m.Size()
	dAtA = make([]byte, size)
	n, err := m.MarshalTo(dAtA)
	if err != nil {
		return nil, err
	}
	return dAtA[:n], nil
}

func (m *StreamPayload) MarshalTo(dAtA []byte) (int, error) {
	var i int
	_ = i
	var l int
	_ = l
	if m.Event != 0 {
		dAtA[i] = 0x8
		i++
		i = encodeVarintStream(dAtA, i, uint64(m.Event))
	}
	if m.Object != nil {
		nn1, err := m.Object.MarshalTo(dAtA[i:])
		if err != nil {
			return 0, err
		}
		i += nn1
	}
	return i, nil
}

func (m *StreamPayload_Entity) MarshalTo(dAtA []byte) (int, error) {
	i := 0
	if m.Entity != nil {
		dAtA[i] = 0x12
		i++
		i = encodeVarintStream(dAtA, i, uint64(m.Entity.Size()))
		n2, err := m.Entity.MarshalTo(dAtA[i:])
		if err != nil {
			return 0, err
		}
		i += n2
	}
	return i, nil
}
func (m *StreamPayload_Rel) MarshalTo(dAtA []byte) (int, error) {
	i := 0
	if m.Rel != nil {
		dAtA[i] = 0x1a
		i++
		i = encodeVarintStream(dAtA, i, uint64(m.Rel.Size()))
		n3, err := m.Rel.MarshalTo(dAtA[i:])
		if err != nil {
			return 0, err
		}
		i += n3
	}
	return i, nil
}
func encodeFixed64Stream(dAtA []byte, offset int, v uint64) int {
	dAtA[offset] = uint8(v)
	dAtA[offset+1] = uint8(v >> 8)
	dAtA[offset+2] = uint8(v >> 16)
	dAtA[offset+3] = uint8(v >> 24)
	dAtA[offset+4] = uint8(v >> 32)
	dAtA[offset+5] = uint8(v >> 40)
	dAtA[offset+6] = uint8(v >> 48)
	dAtA[offset+7] = uint8(v >> 56)
	return offset + 8
}
func encodeFixed32Stream(dAtA []byte, offset int, v uint32) int {
	dAtA[offset] = uint8(v)
	dAtA[offset+1] = uint8(v >> 8)
	dAtA[offset+2] = uint8(v >> 16)
	dAtA[offset+3] = uint8(v >> 24)
	return offset + 4
}
func encodeVarintStream(dAtA []byte, offset int, v uint64) int {
	for v >= 1<<7 {
		dAtA[offset] = uint8(v&0x7f | 0x80)
		v >>= 7
		offset++
	}
	dAtA[offset] = uint8(v)
	return offset + 1
}
func (m *StreamPayload) Size() (n int) {
	var l int
	_ = l
	if m.Event != 0 {
		n += 1 + sovStream(uint64(m.Event))
	}
	if m.Object != nil {
		n += m.Object.Size()
	}
	return n
}

func (m *StreamPayload_Entity) Size() (n int) {
	var l int
	_ = l
	if m.Entity != nil {
		l = m.Entity.Size()
		n += 1 + l + sovStream(uint64(l))
	}
	return n
}
func (m *StreamPayload_Rel) Size() (n int) {
	var l int
	_ = l
	if m.Rel != nil {
		l = m.Rel.Size()
		n += 1 + l + sovStream(uint64(l))
	}
	return n
}

func sovStream(x uint64) (n int) {
	for {
		n++
		x >>= 7
		if x == 0 {
			break
		}
	}
	return n
}
func sozStream(x uint64) (n int) {
	return sovStream(uint64((x << 1) ^ uint64((int64(x) >> 63))))
}
func (m *StreamPayload) Unmarshal(dAtA []byte) error {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		preIndex := iNdEx
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return ErrIntOverflowStream
			}
			if iNdEx >= l {
				return io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= (uint64(b) & 0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		fieldNum := int32(wire >> 3)
		wireType := int(wire & 0x7)
		if wireType == 4 {
			return fmt.Errorf("proto: StreamPayload: wiretype end group for non-group")
		}
		if fieldNum <= 0 {
			return fmt.Errorf("proto: StreamPayload: illegal tag %d (wire type %d)", fieldNum, wire)
		}
		switch fieldNum {
		case 1:
			if wireType != 0 {
				return fmt.Errorf("proto: wrong wireType = %d for field Event", wireType)
			}
			m.Event = 0
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowStream
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				m.Event |= (StreamPayload_Event(b) & 0x7F) << shift
				if b < 0x80 {
					break
				}
			}
		case 2:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Entity", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowStream
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= (int(b) & 0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthStream
			}
			postIndex := iNdEx + msglen
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			v := &Entity{}
			if err := v.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			m.Object = &StreamPayload_Entity{v}
			iNdEx = postIndex
		case 3:
			if wireType != 2 {
				return fmt.Errorf("proto: wrong wireType = %d for field Rel", wireType)
			}
			var msglen int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return ErrIntOverflowStream
				}
				if iNdEx >= l {
					return io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				msglen |= (int(b) & 0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			if msglen < 0 {
				return ErrInvalidLengthStream
			}
			postIndex := iNdEx + msglen
			if postIndex > l {
				return io.ErrUnexpectedEOF
			}
			v := &Rel{}
			if err := v.Unmarshal(dAtA[iNdEx:postIndex]); err != nil {
				return err
			}
			m.Object = &StreamPayload_Rel{v}
			iNdEx = postIndex
		default:
			iNdEx = preIndex
			skippy, err := skipStream(dAtA[iNdEx:])
			if err != nil {
				return err
			}
			if skippy < 0 {
				return ErrInvalidLengthStream
			}
			if (iNdEx + skippy) > l {
				return io.ErrUnexpectedEOF
			}
			iNdEx += skippy
		}
	}

	if iNdEx > l {
		return io.ErrUnexpectedEOF
	}
	return nil
}
func skipStream(dAtA []byte) (n int, err error) {
	l := len(dAtA)
	iNdEx := 0
	for iNdEx < l {
		var wire uint64
		for shift := uint(0); ; shift += 7 {
			if shift >= 64 {
				return 0, ErrIntOverflowStream
			}
			if iNdEx >= l {
				return 0, io.ErrUnexpectedEOF
			}
			b := dAtA[iNdEx]
			iNdEx++
			wire |= (uint64(b) & 0x7F) << shift
			if b < 0x80 {
				break
			}
		}
		wireType := int(wire & 0x7)
		switch wireType {
		case 0:
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowStream
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				iNdEx++
				if dAtA[iNdEx-1] < 0x80 {
					break
				}
			}
			return iNdEx, nil
		case 1:
			iNdEx += 8
			return iNdEx, nil
		case 2:
			var length int
			for shift := uint(0); ; shift += 7 {
				if shift >= 64 {
					return 0, ErrIntOverflowStream
				}
				if iNdEx >= l {
					return 0, io.ErrUnexpectedEOF
				}
				b := dAtA[iNdEx]
				iNdEx++
				length |= (int(b) & 0x7F) << shift
				if b < 0x80 {
					break
				}
			}
			iNdEx += length
			if length < 0 {
				return 0, ErrInvalidLengthStream
			}
			return iNdEx, nil
		case 3:
			for {
				var innerWire uint64
				var start int = iNdEx
				for shift := uint(0); ; shift += 7 {
					if shift >= 64 {
						return 0, ErrIntOverflowStream
					}
					if iNdEx >= l {
						return 0, io.ErrUnexpectedEOF
					}
					b := dAtA[iNdEx]
					iNdEx++
					innerWire |= (uint64(b) & 0x7F) << shift
					if b < 0x80 {
						break
					}
				}
				innerWireType := int(innerWire & 0x7)
				if innerWireType == 4 {
					break
				}
				next, err := skipStream(dAtA[start:])
				if err != nil {
					return 0, err
				}
				iNdEx = start + next
			}
			return iNdEx, nil
		case 4:
			return iNdEx, nil
		case 5:
			iNdEx += 4
			return iNdEx, nil
		default:
			return 0, fmt.Errorf("proto: illegal wireType %d", wireType)
		}
	}
	panic("unreachable")
}

var (
	ErrInvalidLengthStream = fmt.Errorf("proto: negative length found during unmarshaling")
	ErrIntOverflowStream   = fmt.Errorf("proto: integer overflow")
)

func init() { proto.RegisterFile("stream.proto", fileDescriptorStream) }

var fileDescriptorStream = []byte{
	// 312 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x6c, 0x90, 0xdf, 0x4a, 0xf3, 0x30,
	0x18, 0xc6, 0x9b, 0x95, 0x75, 0xfb, 0xde, 0x7d, 0xca, 0x08, 0x0c, 0xc6, 0x94, 0x3a, 0x06, 0x83,
	0x9d, 0x98, 0xe9, 0xbc, 0x00, 0x61, 0x2c, 0xb0, 0x03, 0xff, 0xd1, 0x09, 0x82, 0x67, 0x6d, 0xf7,
	0x1a, 0x23, 0x6d, 0x33, 0xb2, 0x6c, 0xb0, 0x3b, 0xf3, 0x12, 0x76, 0xe8, 0x25, 0x68, 0xaf, 0x44,
	0x9a, 0x56, 0x44, 0xf1, 0xec, 0x79, 0xde, 0xe7, 0x97, 0xe4, 0xc9, 0x0b, 0xff, 0xd7, 0x46, 0x63,
	0x98, 0xb2, 0x95, 0x56, 0x46, 0x51, 0xaf, 0x74, 0xbd, 0x53, 0x21, 0xcd, 0xf3, 0x26, 0x62, 0xb1,
	0x4a, 0xc7, 0x42, 0x09, 0x35, 0xb6, 0x71, 0xb4, 0x79, 0xb2, 0xce, 0x1a, 0xab, 0xca, 0x63, 0x3d,
	0x5f, 0x28, 0x25, 0x12, 0xfc, 0xa6, 0x96, 0x1b, 0x1d, 0x1a, 0xa9, 0xb2, 0x2a, 0x3f, 0xf9, 0x9d,
	0x1b, 0x99, 0xe2, 0xda, 0x84, 0xe9, 0xaa, 0x02, 0xfe, 0xa1, 0x5e, 0x96, 0x72, 0xf0, 0x4a, 0xe0,
	0x60, 0x61, 0x5b, 0xdc, 0x85, 0xbb, 0x44, 0x85, 0x4b, 0x7a, 0x0e, 0x75, 0xdc, 0x62, 0x66, 0xba,
	0xa4, 0x4f, 0x46, 0x87, 0x93, 0x23, 0x56, 0x55, 0xfe, 0x41, 0x31, 0x5e, 0x20, 0x41, 0x49, 0xd2,
	0x21, 0x78, 0x98, 0x19, 0x69, 0x76, 0xdd, 0x5a, 0x9f, 0x8c, 0x5a, 0x93, 0x16, 0x2b, 0x1e, 0xe0,
	0x76, 0x34, 0x77, 0x82, 0x2a, 0xa4, 0xc7, 0xe0, 0x6a, 0x4c, 0xba, 0xae, 0x65, 0x9a, 0x96, 0x09,
	0x30, 0x99, 0x3b, 0x41, 0x31, 0x1e, 0x0c, 0xa1, 0x6e, 0x2f, 0xa5, 0x0d, 0x70, 0x6f, 0xf8, 0x43,
	0xdb, 0x29, 0xc4, 0xf5, 0xed, 0xac, 0x4d, 0x28, 0x80, 0x37, 0xe3, 0x57, 0xfc, 0x9e, 0xb7, 0x6b,
	0xd3, 0x26, 0x78, 0x2a, 0x7a, 0xc1, 0xd8, 0x4c, 0x2e, 0xbf, 0x9a, 0x2f, 0x50, 0x6f, 0x65, 0x8c,
	0x94, 0x41, 0x23, 0xc0, 0x18, 0xe5, 0x16, 0x29, 0x94, 0x0d, 0xd2, 0x95, 0xd9, 0xf5, 0x3a, 0x7f,
	0xfe, 0xe0, 0x8c, 0x4c, 0x3b, 0xfb, 0x0f, 0xdf, 0xd9, 0xe7, 0x3e, 0x79, 0xcb, 0x7d, 0xf2, 0x9e,
	0xfb, 0xe4, 0xd1, 0x15, 0x98, 0x45, 0x9e, 0xdd, 0xcc, 0xc5, 0x67, 0x00, 0x00, 0x00, 0xff, 0xff,
	0x12, 0x20, 0xa5, 0xb5, 0xac, 0x01, 0x00, 0x00,
}