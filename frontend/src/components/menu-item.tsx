import { DeleteOutline, Edit } from '@mui/icons-material'
import { Category, MenuItem as MenuItemType } from '../api/getAllCategories'
import styled from '@emotion/styled'
import { Box, Button } from '@mui/material'
import { MenuItemDrawer } from './menu-item-drawer'
import { useState } from 'react'
import { DeleteMenuItemDialog } from './delete-menu-item-dialog'

const Card = styled.div`
  border-top: 1px solid #bfbfbf;
  border-bottom: 1px solid #bfbfbf;
  padding-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 200px;

  h2 {
    font-weight: 500;
  }

  span {
    color: #008000;
  }

  p {
    color: #8c8c8c;
  }

  &:hover {
    background-color: #f2f2f2df;
    cursor: pointer;
  }

  transition: background-color 0.3s;
`

interface MenuItemProps {
  menuItem: MenuItemType
  adminMode: boolean
  categories: Category[]
}

export function MenuItem({ menuItem, adminMode, categories }: MenuItemProps) {
  const [openMenuDrawer, setOpenMenuDrawer] = useState(false)
  const [openDeleteMenuDialog, setOpenDeleteMenuDialog] = useState(false)

  function handleCloseMenuDialog() {
    setOpenMenuDrawer(false)
  }

  function handleOpenMenuDialog() {
    setOpenMenuDrawer(true)
  }

  function handleCloseDeleteMenuDialog() {
    setOpenDeleteMenuDialog(false)
  }

  function handleOpenDeleteMenuDialog() {
    setOpenDeleteMenuDialog(true)
  }

  return (
    <>
      <MenuItemDrawer
        open={openMenuDrawer}
        handleClose={handleCloseMenuDialog}
        categoriesOptions={categories}
        initialValues={menuItem}
        editMode
      />
      <DeleteMenuItemDialog
        open={openDeleteMenuDialog}
        handleClose={handleCloseDeleteMenuDialog}
      />
      <Card>
        <div>
          <h2>{menuItem.title}</h2>
          <p>{menuItem.description}</p>
          <span>
            {(menuItem.price / 100).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>

        {adminMode ? (
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              marginRight: 2,
            }}
          >
            <Edit onClick={handleOpenMenuDialog} sx={{ cursor: 'pointer' }} />
            <DeleteOutline
              sx={{
                color: 'red',
              }}
              onClick={handleOpenDeleteMenuDialog}
            />
          </Box>
        ) : (
          <Button variant="contained" sx={{ zIndex: 0 }}>
            Add to cart
          </Button>
        )}
      </Card>
    </>
  )
}
