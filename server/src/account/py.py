# class Node:
#     def __init__(self, value):
#         self.value = value
#         self.left = None
#         self.mid = None
#         self.right = None

# def evaluate(node):
#     if node is None:
#         return 0

#     if node.value == 'if':
#         condition = evaluate(node.mid)
#         if condition:
#             return evaluate(node.left)
#         else:
#             return evaluate(node.right)
    
#     if node.left is None and node.right is None:
#         return int(node.value)
    
#     left_val = evaluate(node.left)
#     right_val = evaluate(node.right)
    
#     if node.value == '+':
#         return left_val + right_val
#     elif node.value == '-':
#         return left_val - right_val
#     elif node.value == '*':
#         return left_val * right_val
#     elif node.value == '/':
#         return left_val / right_val
#     elif node.value == '%':
#         return left_val % right_val
#     elif node.value == '|':
#         return left_val | right_val
#     elif node.value == '&':
#         return left_val & right_val
#     elif node.value == '<':
#         return left_val < right_val
#     elif node.value == '>':
#         return left_val > right_val
#     elif node.value == '!=':
#         return left_val != right_val
#     elif node.value == '<=':
#         return left_val <= right_val
#     elif node.value == '>=':
#         return left_val >= right_val
#     elif node.value == '==':
#         return left_val == right_val
#     elif node.value == '>>':
#         return left_val >> right_val
#     elif node.value == '<<':
#         return left_val << right_val

# # Пример использования
# root = Node('-')
# root.right = Node(3)

# root.left = Node('+')
# root.left.left = Node('-')
# root.left.left.left = Node('if')
# root.left.left.right = Node(5)
# root.left.left.left.mid = Node('!=')
# root.left.left.left.left = Node(7)
# root.left.left.left.right = Node('>>')
# root.left.left.left.mid.left = Node(5)
# root.left.left.left.mid.right = Node(5)
# root.left.left.left.right.left = Node(5)
# root.left.left.left.right.right = Node(8)





# root.left.right = Node('if')
# root.left.right.mid = Node('<=')
# root.left.right.left = Node('*')
# root.left.right.right = Node('-')
# root.left.right.mid.left = Node(5)
# root.left.right.mid.right = Node(9)
# root.left.right.left.left = Node(5)
# root.left.right.left.right = Node(4)
# root.left.right.right.left = Node(5)
# root.left.right.right.right = Node(4)




# result = evaluate(root)
# print(result)  # Выведет 11